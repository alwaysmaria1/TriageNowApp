import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

export default Password<DataModel>({
    profile(params) {
        return {
            email: params.email as string,
            name: params.name as string,
            role: params.role as string,
            userID: params.userID as string,
            userZone: params.userZone as string,
        };
    },
});