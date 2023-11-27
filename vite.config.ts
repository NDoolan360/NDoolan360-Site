import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

export default defineConfig({
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
    server: {
        proxy: {
            "/proxy/github": {
                target: "https://github.com/NDoolan360",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy\/github/, ""),
                headers: { cookie: "logged_in=0" },
            },
            "/proxy/cults3d": {
                target: "https://cults3d.com/en/users/ND360/3d-models",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy\/cults3d/, ""),
            },
            "/proxy/boardgamegeek": {
                target: "https://boardgamegeek.com/geeksearch.php?action=search&advsearch=1&objecttype=boardgame&include%5Bdesignerid%5D=133893",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy\/boardgamegeek/, ""),
            },
            "/proxy/xmlapi/boardgamegeek/": {
                target: "https://api.geekdo.com/xmlapi/boardgame/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy\/xmlapi\/boardgamegeek\//, ""),
            },
        },
    },
});
