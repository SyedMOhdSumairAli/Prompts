import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const GET = async (request,{params}) => {
    
try {
    await connectToDB();

    const prompt = await Prompt.find({
        creator:params.id
    }).populate('creator');
    return new Response (JSON.stringify(prompt),{
        status : 200
    })
} catch (error) {
    return new Response ("Failed to Fetch all Prompts",{
        status : 500
    })
}
}