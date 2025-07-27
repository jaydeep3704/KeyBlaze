const paragraph="The sun rose slowly over the quiet hills casting a golden light across the valley Birds flew gently in the morning sky while the air remained still and fresh A small river ran through the middle of the village its clear water reflecting the trees along its edge Children walked along the path to school carrying their bags and talking about the day ahead In the fields farmers were already at work tending to the crops and feeding the animals The sound of roosters could be heard in the distance blending with the soft breeze that moved the leaves An old man sat outside his house sipping tea and watching the world go by He smiled as a dog ran past chasing a butterfly The shops in the market began to open one by one with shopkeepers sweeping the ground and arranging goods on display There was a sense of peace in every corner as life moved on slowly and calmly People greeted each other with warm smiles and friendly words The village felt alive and safe a place where everyone knew one another and helped when needed It was a simple life but full of meaning and joy built on kindness trust and hard work"


const paragraphArray=paragraph.split(" ")

export const generateParagraph=()=>{
    let words=[]
    for(let i=0;i<200;i++){
        words.push(paragraphArray[Math.floor(Math.random()*paragraphArray.length)])
    }
    return words.join(' ');
}