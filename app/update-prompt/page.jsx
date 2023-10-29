"use client";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {


    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: '',
    });
    useEffect(() => {
        const getPromptDeatils = async () => {
            const response = await fetch(`/api/prompts/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) getPromptDeatils();
    }, [promptId])
    if (!promptId) return alert("Prompt ID not found")

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const respone = await fetch(`/api/prompts/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (respone.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }

        return (
            <Form type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handlesubmit={updatePrompt}
            />
        )
    }

}
export default EditPrompt