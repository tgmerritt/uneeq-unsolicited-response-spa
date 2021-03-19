import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

// import useTheme from "../../hooks/useTheme"; // Allow them switching Light / Dark
import "./Unsolicited.css";
import logo from "../../logo.png";

// B0353838-96A1-3F7D-3059-87501BA891D6
// 563549f4-140a-42e3-bd31-81ed79c58cde

const initialState = {
    sessionId: '',
    jwtToken: '',
    spokenText: ''
}

export default function Unsolicited() {

    const [
        { sessionId, jwtToken, spokenText },
        setState
      ] = useState(initialState);

      const clearTextState = () => {
        setState({
            sessionId,
            jwtToken,
            spokenText: ''
        });
      };

      const clearState = () => {
        setState({...initialState})
      }
    
      const onChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
      };

    function sendUnsolicitedResponse() {
        const signedToken = jwt.sign({"sessionId":sessionId}, jwtToken);
        const body = {
            answer: spokenText,
            answerAvatar: "{}",
            sessionIdJwt: signedToken
        };
        const url = `https://api.us.uneeq.io/api/v1/avatar/${sessionId}/speak`;
        axios.post(url, body)
          .then((response) => {
            clearTextState();
            console.log(sessionId, jwtToken, spokenText)
            console.log(response);
          }) 
          .catch((error) => {
            alert(error);
            clearState();
            console.log(error);
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendUnsolicitedResponse();
        // alert(`Submitting Name ${evt}`)
        console.log(sessionId, jwtToken, spokenText)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="App-content mt-10">
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li className="form-row">
                            <label htmlFor="jwtToken" className="inputFieldLabels">JWT Token</label>
                            <input
                                className=""
                                id="jwtToken"
                                value={jwtToken}
                                name="jwtToken"
                                type="text"
                                onChange={onChange}
                            />
                        </li>
                        <li className="form-row">
                            <label htmlFor="sessionId" className="inputFieldLabels">Session ID</label>
                            <input
                                className=""
                                id="sessionId"
                                value={sessionId}
                                name="sessionId"
                                type="text"
                                onChange={onChange}
                            />
                        </li>
                        <li className="form-row">
                            <label htmlFor="spokenText" className="inputFieldLabels">Spoken Text</label>
                            <textarea
                                className="resize"
                                id="spokenText"
                                value={spokenText}
                                name="spokenText"
                                type="textarea"
                                onChange={onChange}
                            />
                        </li>
                        <li className="form-row">
                            <input 
                                type="submit" 
                                value="SEND UNSOLICITED RESPONSE" 
                                className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded" 
                            />
                        </li>
                    </ul> 
                </form>
             </div>
         </div>
    );
}
