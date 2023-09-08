import axios from 'axios';
import React, {useState} from 'react';

function ChatGPT(){
    const [searchPromptData, setSearchPromptData] = useState({ prompt: ''});
    const [promptResponse, setPromptResponse] = useState ('');
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);


    const handleSearch = async (e) => {
        e.preventDefault();
        setIsloading(true);
      
        // Check if the user's input contains keywords related to restaurants or locations
        const userInput = searchPromptData.prompt.toLowerCase();
        const isRestaurantRelated = userInput.includes('restaurant') || userInput.includes('food');
        const isLocationRelated = userInput.includes('location') || userInput.includes('place');
      
        if (!isRestaurantRelated && !isLocationRelated) {
          // Display an error message to the user
          setError("Please enter a query related to restaurants or locations.");
          setIsloading(false);
          return;
        }
      
        try {
          const chatApiUrl = `${import.meta.env.VITE_BACKEND_URL}/chat`;
          const axiosResponse = await axios.get(chatApiUrl, {
            params: {
              message: searchPromptData.prompt,
            },
          });
          setPromptResponse(axiosResponse.data);
          setError(null); // Clear the error message on success
        } catch (e) {
          console.error('error:', e);
          setError("An error occurred. Please try again."); // Set an error message on failure
        } finally {
          setIsloading(false);
        }
      };
      

    return (
        <div className='chat-container'>
            <h1 className='chat-title'> Want to know learn more about a location? Ask me anything...</h1>
            <div>
                <textarea
                className='chatbox'
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