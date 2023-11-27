import { describe, expect, test } from "bun:test";
import {
    fetchData,
    projectIntoTemplate,
    scrapeBgg,
    scrapeCults3d,
    scrapeGithub,
    upgradeBggImage,
} from "projects";

describe("Projects", () => {
    test("Github project into Template", async () => {
        const indexMockDoc = await fetchData("index.html");
        const githubMockDoc = await fetchData("tests/data/githubProjects.html");

        const template = indexMockDoc.getElementById("project-template") as HTMLTemplateElement;
        const githubProjects = scrapeGithub(githubMockDoc);
        const project = githubProjects.at(0);

        if (project) {
            expect(template).not.toBeUndefined();
            const fragment = projectIntoTemplate(project, template);

            expect(
                fragment.querySelector<HTMLHeadingElement>('[class*="card-heading"]')?.textContent,
            ).toBe("NDoolan360-Site");
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-description"]')
                    ?.textContent,
            ).toBe("My hand crafted personal website");
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-link"]')?.href).toBe(
                "https://github.com/NDoolan360/NDoolan360-Site",
            );
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-language-name"]')
                    ?.textContent,
            ).toBe("TypeScript");
            expect(
                fragment
                    .querySelector<HTMLSpanElement>('[class*="card-language-colour"]')
                    ?.getAttribute("style"),
            ).toBe("background-color: #3178c6");
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.href).toBe(
                "https://github.com/NDoolan360/NDoolan360-Site",
            );
            expect(
                fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.innerHTML,
            ).toBe("github");
            expect(
                fragment.querySelector<HTMLImageElement>('[class*="card-feature-image"]')?.src,
            ).toBe("/images/default.png");
        }
    });

    test("Cults3d project into Template", async () => {
        const indexMockDoc = await fetchData("index.html");
        const cults3dMockDoc = await fetchData("tests/data/cults3dProjects.html");

        const template = indexMockDoc.getElementById("project-template") as HTMLTemplateElement;
        const cults3dProjects = scrapeCults3d(cults3dMockDoc);
        const project = cults3dProjects.at(0);

        if (project) {
            expect(template).not.toBeUndefined();
            const fragment = projectIntoTemplate(project, template);

            expect(
                fragment.querySelector<HTMLHeadingElement>('[class*="card-heading"]')?.textContent,
            ).toBe("Reciprocating Rack and Pinion Fidget V2");
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-description"]')
                    ?.textContent,
            ).toBeUndefined();
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-link"]')?.href).toBe(
                "https://cults3d.com/en/3d-model/gadget/reciprocating-rack-and-pinion-fidget-v2",
            );
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-language-name"]')
                    ?.textContent,
            ).toBeUndefined();
            expect(
                fragment
                    .querySelector<HTMLSpanElement>('[class*="card-language-colour"]')
                    ?.getAttribute("style"),
            ).toBeUndefined();
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.href).toBe(
                "https://cults3d.com/en/3d-model/gadget/reciprocating-rack-and-pinion-fidget-v2",
            );
            expect(
                fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.innerHTML,
            ).toBe("cults3d");
            const featureImage = fragment.querySelector<HTMLImageElement>(
                '[class*="card-feature-image"]',
            );
            expect(featureImage).not.toBeUndefined();
            if (featureImage) {
                expect(featureImage.src).toBe("/images/default.png");
                if (featureImage.onload) {
                    featureImage.onload(new Event("load"));
                    expect(featureImage.src).toBe(
                        "https://images.cults3d.com/{RRaP Image Link}/https://files.cults3d.com/{RRaP High-res Image Link}",
                    );

                    featureImage.onload(new Event("load"));
                    expect(featureImage.src).toBe(
                        "https://files.cults3d.com/{RRaP High-res Image Link}",
                    );
                }
            }
        }
    });

    test("Bgg project into Template", async () => {
        const indexMockDoc = await fetchData("index.html");
        const bggMockDoc = await fetchData("tests/data/bggProjects.html");
        const bggMockXml = await fetchData("tests/data/bggImage.xml", "text/xml");

        const template = indexMockDoc.getElementById("project-template") as HTMLTemplateElement;
        const bggProjects = scrapeBgg(bggMockDoc);
        const project = bggProjects.at(0);

        if (project) {
            upgradeBggImage(project, bggMockXml);

            expect(template).not.toBeUndefined();
            const fragment = projectIntoTemplate(project, template);

            expect(
                fragment.querySelector<HTMLHeadingElement>('[class*="card-heading"]')?.textContent,
            ).toBe("Cake Toppers");
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-description"]')
                    ?.textContent,
            ).toBe("Bakers assemble the most outrageous cakes to top each other.");
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-link"]')?.href).toBe(
                "https://boardgamegeek.com/boardgame/330653/cake-toppers",
            );
            expect(
                fragment.querySelector<HTMLParagraphElement>('[class*="card-language-name"]')
                    ?.textContent,
            ).toBeUndefined();
            expect(
                fragment
                    .querySelector<HTMLSpanElement>('[class*="card-language-colour"]')
                    ?.getAttribute("style"),
            ).toBeUndefined();
            expect(fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.href).toBe(
                "https://boardgamegeek.com/boardgame/330653/cake-toppers",
            );
            expect(
                fragment.querySelector<HTMLAnchorElement>('[class*="card-logo"]')?.innerHTML,
            ).toBe("boardgamegeek");
            const featureImage = fragment.querySelector<HTMLImageElement>(
                '[class*="card-feature-image"]',
            );
            expect(featureImage).not.toBeUndefined();
            if (featureImage) {
                expect(featureImage.src).toBe("/images/default.png");
            }

            if (featureImage?.onload) {
                featureImage.onload(new Event("load"));
                expect(featureImage.src).toBe("{Cake Toppers Image Link}");

                featureImage.onload(new Event("load"));
                expect(featureImage.src).toBe("{Cake Toppers High-res Image Link}");
            }
        }
    });
});
