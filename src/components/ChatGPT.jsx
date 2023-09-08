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
        <div className='chat-container'>
            <h1 className='chat-title'> Ask me anything...</h1>
            <div>
                <textarea 
                className='chatbox'
                rows="4" 
                cols="50"
                placeholder="Ask me a question like: Cafe in seattle and please include yelp links to the cafes and ratings. Be specific for better results."
                value={searchPromptData.prompt}
                onChange={(e) => setSearchPromptData({prompt: e.target.value})}
                />
            </div>
            <button className='chat-btn' onClick={handleSearch}>Search</button>
            <div className='chat-response'> 
                {isLoading ? 'Loading...' : (
                // Use <br> for line breaks and <ul>/<li> for lists
                    <div>
                        {promptResponse.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div> 
    )
}



export default ChatGPT;