import { GoogleGenAI } from "@google/genai";
import chalk from "chalk";
 
const string="In a quiet town nestled between rolling hills and winding rivers there lived a girl who believed the world spoke in colors she would wake each morning and watch the sunrise from her window counting the shades of pink orange and gold as if they were secret messages meant only for her she would walk barefoot through the dewy grass listening to the wind rustle through the trees like a gentle whisper carrying stories from faraway lands her neighbors often thought her odd always scribbling in notebooks and humming tunes that had no words but they never questioned her kindness she helped the old man down the street carry groceries and read to children at the library every Thursday afternoon the town itself was small and sleepy with cobblestone streets and a single bakery that smelled like vanilla and warm butter the baker was a round"

function generateParagraphUsingPredefinedText(){
    const words=string.split(" ")
    const paragraph=[]
    for(let i=0;i<150;i++){
        paragraph.push(words[Math.floor(Math.random()*words.length)])
    }

    return paragraph.join(' ').toLowerCase()
}


//generate paragraph using ai
export async function generateParagraph(){
    try {
    const ai=new GoogleGenAI({
        apiKey:process.env.GEMINI_API_KEY,
    })

    const response=await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate or pick up a random paragraph from popular novel it must be at least 150 words long remove punctuations from it only give me the paragraph text don't write anything in the response except it",
    })
      return response.text
    } 
    catch (error) {
        console.log(chalk.red("An error occured while generating paragraph"))
        return generateParagraphUsingPredefinedText()
    }
}