import { describe, expect, test } from "bun:test";
import { file } from "bun";
import { scrapeBgg, scrapeCults3d, scrapeGithub, upgradeBggImage } from "projects";

describe("Projects", () => {
    test("Scrape Github data", async () => {
        const githubProjects = await file("tests/data/githubProjects.html").text();

        const parser = new DOMParser();
        const githubMockDoc = parser.parseFromString(githubProjects, "text/html");
        const projects = scrapeGithub(githubMockDoc);

        expect(projects.length).toEqual(1);

        expect(projects[0].host).toEqual("github");
        expect(projects[0].title).toEqual("NDoolan360-Site");
        expect(projects[0].description).toEqual("My hand crafted personal website");
        expect(projects[0].url?.toString()).toEqual(
            "https://github.com/NDoolan360/NDoolan360-Site",
        );
        expect(projects[0].image?.highResSrc).toEqual("/images/github.png");
        expect(projects[0].image?.lowResSrc).toEqual(null);
        expect(projects[0].image?.alt).toEqual("Github Logo");
        expect(projects[0].programmingLanguage?.name).toEqual("TypeScript");
        expect(projects[0].programmingLanguage?.style).toEqual("background-color: #3178c6");
    });

    test("Scrape Cults3D data", async () => {
        const cults3dProjects = await file("tests/data/cults3dProjects.html").text();

        const parser = new DOMParser();
        const cults3dMockDoc = parser.parseFromString(cults3dProjects, "text/html");
        const projects = scrapeCults3d(cults3dMockDoc);

        expect(projects.length).toEqual(2);

        expect(projects[0].host).toEqual("cults3d");
        expect(projects[0].title).toEqual("Reciprocating Rack and Pinion Fidget V2");
        expect(projects[0].description).toBeUndefined();
        expect(projects[0].url?.toString()).toEqual(
            "https://cults3d.com/en/3d-model/gadget/reciprocating-rack-and-pinion-fidget-v2",
        );
        expect(projects[0].image?.highResSrc).toEqual(
            "https://files.cults3d.com/{RRaP High-res Image Link}",
        );
        expect(projects[0].image?.lowResSrc).toEqual(
            "https://images.cults3d.com/{RRaP Image Link}/https://files.cults3d.com/{RRaP High-res Image Link}",
        );
        expect(projects[0].image?.alt).toEqual(
            "RRaPv2.png Reciprocating Rack and Pinion Fidget V2",
        );
        expect(projects[0].programmingLanguage).toBeUndefined();

        expect(projects[1].host).toEqual("cults3d");
        expect(projects[1].title).toEqual("Thought Processor");
        expect(projects[1].description).toBeUndefined();
        expect(projects[1].url?.toString()).toEqual(
            "https://cults3d.com/en/3d-model/art/thought-processor",
        );
        expect(projects[1].image?.highResSrc).toEqual(
            "https://files.cults3d.com/{Thought Processor High-res Image Link}",
        );
        expect(projects[1].image?.lowResSrc).toEqual(
            "https://images.cults3d.com/{Thought Processor Image Link}/https://files.cults3d.com/{Thought Processor High-res Image Link}",
        );
        expect(projects[1].image?.alt).toEqual("Thought-Processor.png Thought Processor");
        expect(projects[1].programmingLanguage).toBeUndefined();
    });

    test("Scrape BGG data", async () => {
        const bggProjects = await file("tests/data/bggProjects.html").text();

        const parser = new DOMParser();
        const bggMockDoc = parser.parseFromString(bggProjects, "text/html");
        const projects = scrapeBgg(bggMockDoc);

        expect(projects.length).toEqual(1);

        expect(projects[0].host).toEqual("boardgamegeek");
        expect(projects[0].title).toEqual("Cake Toppers");
        expect(projects[0].description).toEqual(
            "Bakers assemble the most outrageous cakes to top each other.",
        );
        expect(projects[0].url?.toString()).toEqual(
            "https://boardgamegeek.com/boardgame/330653/cake-toppers",
        );
        expect(projects[0].image?.highResSrc).toEqual("{Cake Toppers Image Link}");
        expect(projects[0].image?.lowResSrc).toEqual(null);
        expect(projects[0].image?.alt).toEqual("Board Game: Cake Toppers");
        expect(projects[0].programmingLanguage).toBeUndefined();

        const bggImageXml = await file("tests/data/bggImage.xml").text();

        const bggMockXmlDoc = parser.parseFromString(bggImageXml, "text/xml");
        upgradeBggImage(projects[0], bggMockXmlDoc);

        expect(projects[0].image?.highResSrc).toEqual("{Cake Toppers High-res Image Link}");
        expect(projects[0].image?.lowResSrc).toEqual("{Cake Toppers Image Link}");
    });
});
