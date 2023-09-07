import axios from 'axios';
import React, {useState} from 'react';

function ChatGPT(){
    const [searchPromptData, setSearchPromptData] = useState({ prompt: ''});
    const [promptResponse, setPromptResponse] = useState ('');

const handleSearch = async () => {
    try {
        const chatApiUrl = `${import.meta.env.VITE_BACKEND_URL}/chat`; // use this endpoint for chatgpt

        const promptResponse = await axios.get(chatApiUrl, {
                params: {
                    message: searchPromptData.prompt,
                },
            });
        

        console.log(promptResponse);
    
    }catch (e){
        console.error('error:', e);

    }
};

return (
    <div>
        <h1> Want to know learn more about a location? Ask me anything...</h1>
        <div>
            <input
            type='text'
            placeholder='type your question'
            value={searchPromptData.prompt}
            onChange={(e) => setSearchPromptData({prompt: e.target.value})}
            />
            <button onClick={handleSearch}>Prompt</button>
        </div>
    </div>
    
)


}



export default ChatGPT;