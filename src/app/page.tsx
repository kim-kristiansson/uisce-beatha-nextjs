import { Button } from "@/components/ui/button"
import qs from "qs"

const homePageQuery = qs.stringify({
    populate: {
        blocks: {
            on: {
                "layout.hero-section": {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        },
    },
})

async function getStrapiData(path: string) {
    const baseUrl = "http://127.0.0.1:1337"

    const url = new URL(path, baseUrl)
    url.search = homePageQuery

    try {
        const response = await fetch(url.href)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export default async function Home() {
    const strapiData = await getStrapiData("/api/home-page")

    console.log(strapiData)

    const { title, description } = strapiData.data

    return (
        <main>
            <h1>{title}</h1>
            <p>{description}</p>
        </main>
    )
}
