import { createClient } from "@supabase/supabase-js";
import ws from "ws";

export const SupabaseClient = {
  provide: "SUPABASE_CLIENT",
  useFactory: () => {
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
      {
        realtime: {
          transport: ws,
        },
      },
    );
  },
};