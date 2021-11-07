import Game from "../pages/Game";
import PlayerAccount from "../pages/PlayerAccount";

const appRoutes = [
    {
        path: "/myAccount",
        component: PlayerAccount
    },
    {
        path: "/",
        component: Game
    }
];

export default appRoutes;