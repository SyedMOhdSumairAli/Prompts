import { connectToDB } from "@utils/database";
import Prompts from "@models/prompts";


// GET (read)

export const GET = async (request, { params }) => {

    try {
        await connectToDB();
        const prompt = await Prompts.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", {
            status: 404
        })
    } catch (error) {
        return new Response("Failed to Fetch all Prompts", {
            status: 500
        })
    }
}

// PATCH (upadate)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}
// DELETE (delete)

export const DELETE = async (resquest, { params }) => {
    try {
        await connectToDB();
        await Prompts.findByIdAndRemove(params.id);
        return new Response("Prompt deleted succesfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", {
            status: 500
        })
    }
}