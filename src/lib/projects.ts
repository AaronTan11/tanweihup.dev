import { z } from "zod"

const projectSchema = z.object({
	repo: z.string(),
	link: z.string(),
	description: z.string()
})

export type Project = z.infer<typeof projectSchema>

export const getProjects = [
	{
		repo: "Verdunic",
		link: "https://github.com/AaronTan11/Verdunic",
		description: ""
	},
	{
		repo: "Sol-EcoWaifu",
		link: "https://github.com/AaronTan11/Sol-EcoWaifu",
		description: ""
	},
	{
		repo: "VueJs Workshop",
		link: "https://github.com/AaronTan11/vuejs-workshop",
		description: ""
	},
	{
		repo: "Streamlit Hackathon",
		link: "https://github.com/AaronTan11/streamlit-hackathon",
		description: ""
	},
	{
		repo: "EthSG",
		link: "https://github.com/AaronTan11/ethsg",
		description: ""
	},
	{
		repo: "Hive",
		link: "https://github.com/AaronTan11/hive",
		description: ""
	},
	{
		repo: "SharkScan",
		link: "https://github.com/AaronTan11/SharkScan",
		description: ""
	},
	{
		repo: "Equipay",
		link: "https://github.com/AaronTan11/Equipay",
		description: ""
	},
	{
		repo: "Muzik-5",
		link: "https://github.com/AaronTan11/Muzik-5",
		description: ""
	},
	{
		repo: "VictionING",
		link: "https://github.com/AaronTan11/VictionING",
		description: ""
	},
	{
		repo: "Qrcode Scanner",
		link: "https://github.com/AaronTan11/qrcode-scanner",
		description: ""
	}
]
