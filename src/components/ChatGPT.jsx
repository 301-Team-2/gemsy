import axios from 'axios';
import React, {useState} from 'react';

function ChatGPT(){
    const [searchPromptData, setSearchPromptData] = useState({ prompt: ''});
    const [promptResponse, setPromptResponse] = useState ('');
    const [isLoading, setIsloading] = useState(false);

const handleSearch = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
        const chatApiUrl = `${import.meta.env.VITE_BACKEND_URL}/chat`; // use this endpoint for chatgpt

        const axiosResponse = await axios.get(chatApiUrl, {
                params: {
                    message: searchPromptData.prompt,
                },
            });
        setPromptResponse(axiosResponse.data);
    
    }catch (e){
        console.error('error:', e);

    }finally{
        setIsloading(false);
    }
};

return (
    <div>
        <h1> Want to know learn more about a location? Ask me anything...</h1>
        <div>
            <textarea 
            rows="4" 
            cols="50"
            placeholder='type your question'
            value={searchPromptData.prompt}
            onChange={(e) => setSearchPromptData({prompt: e.target.value})}
            />
        </div>
        <button onClick={handleSearch}>Search</button>
        <div className='chat-response'> 
            {isLoading ? 'Loading...' : promptResponse}
            
        </div>
    </div>
    
)


}



export default ChatGPT;