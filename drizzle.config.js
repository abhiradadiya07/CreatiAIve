/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_7liEIckpt1Vo@ep-polished-heart-a1squh4v-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
};
