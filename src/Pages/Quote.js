import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

function Quote() {
    // const ar = [{user:"Mayank"}, {user:"Mayank"}, {user:"Mayank"}];
    
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');
    const navigate = useNavigate();

    async function populateQuote(){
        const req = await fetch("http://localhost:5000/api/quote", {
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data = await req.json();
        console.log(data);

        if (data.status === 'ok'){
            setTempQuote(data.quote)
            setQuote(data.quote);
        }else{
            alert(data.error);
        }
    }

    async function updateQuote(event){
        event.preventDefault();

        const req = await fetch("http://localhost:5000/api/quote", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json', 
                'x-access-token': localStorage.getItem('token'),
            },
            body:JSON.stringify({
                quote: tempQuote,
            })
        })

        const data = await req.json();
        console.log(data);

        if (data.status === 'ok'){
            setQuote(tempQuote);
            setTempQuote('')
        }else{
            alert(data.error);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            const user = jwt_decode(token);
            if (!user){
                localStorage.removeItem('token');
                // window.location.href = '/';
                //OR we can use useNavigate
                navigate('/login')
            }else{
                populateQuote();
            }
        }
    }, [navigate])

    return (
        <div>
            <h1>Quote page</h1>
            
            <p>Your quote : {quote || "No quote found"}</p>
            {/* {ar.map((data, index)=>(
                <li key={index}>{data.user}</li>
            ))} */}

            <form onSubmit={updateQuote}>
                <input 
                    type="text" 
                    placeholder='Quote'
                    value={tempQuote || ''}
                    onChange={(e)=> setTempQuote(e.target.value)} 
                />
                <input type="submit" value="Update quote" />
            </form>
        </div>
    )
}

export default Quote
