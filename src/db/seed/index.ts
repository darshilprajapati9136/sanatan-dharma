import postgres from 'postgres';
import {appSettingSeeds, licenseSeeds, roleSeeds} from './control-data';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL is not configured. Set it before running the seed.');
    process.exit(1);
  }

  const sql = postgres(databaseUrl, {max: 1});

  try {
    let insertedRoles = 0;
    for (const role of roleSeeds) {
      const result = await sql`
        insert into roles (name, description)
        values (${role.name}, ${role.description})
        on conflict (name) do nothing
        returning name
      `;
      insertedRoles += result.length;
    }

    let insertedLicenses = 0;
    for (const license of licenseSeeds) {
      const result = await sql`
        insert into licenses (
          name,
          short_name,
          url,
          allows_redistribution,
          allows_modification,
          allows_commercial_use,
          notes
        )
        values (
          ${license.name},
          ${license.short_name},
          ${license.url},
          ${license.allowsRedistribution},
          ${license.allowsModification},
          ${license.allowsCommercialUse},
          ${license.notes}
        )
        on conflict (name) do nothing
        returning name
      `;
      insertedLicenses += result.length;
    }

    let insertedSettings = 0;
    for (const setting of appSettingSeeds) {
      const result = await sql`
        insert into app_settings (key, value, description)
        values (${setting.key}, ${setting.value}, ${setting.description})
        on conflict (key) do nothing
        returning key
      `;
      insertedSettings += result.length;
    }

    console.log(
      `Seeded ${insertedRoles} roles, ${insertedLicenses} licenses, ${insertedSettings} app settings.`
    );
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

main();