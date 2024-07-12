import { useState } from "react";
import useUser from "../App/useUser";
import { Tab, IUploadTabForm } from "../../../interfaces/tab";

import './Upload.css';

//*
//* Currently, this will only allow a user to
//* upload a new pointer to a (hopefully)
//* already existing tab somewhere,
//* which AlphaTab will be pointed to and will read from
//*

//? IDEALLY, users will be able to upload .gp5 files
//? (and all file types accepted by AlphaTab -- until I can make it better ;) )

//!!! IT WORKS!@@@!!!!!!
//! BUT--
//* How can I make it so I dont have to log out then log back in to see my new tabs?
//* also, next up- fix backend to return the tab or errors neatly

async function uploadTab( tabData: IUploadTabForm ) {
    return fetch('http://localhost:8080/tabs/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( tabData )
    })
        .then( data => data.json() )
        .catch( err => console.error( err ) );
}


export default function Upload() {
    const { user } = useUser();
    const userId = user.id;
    const [name, setName] = useState('');
    const [fileURL, setFileURL] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`***** Uploading Tab ${name} from frontend form... *****`)
        const uploadResponse = await uploadTab({
            name,
            fileURL,
            userId
        });

        if ( uploadResponse.messages?.length ) {
            setErrors( uploadResponse.messages );
            return;
        }

        const tab: Tab = uploadResponse.tab;
        console.log( `----upload tab response: ${tab} ----` );
        if ( tab !== undefined && tab !== null ) {
            console.log(`***** Tab ${tab} Successfully Uploaded!!! *****`)
        }

        setErrors([]); //? Should I navigate to a page with the current tab loaded?
        setName('');
        setFileURL('');
    }

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName( e.target.value );
    }

    const updateFileURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileURL( e.target.value );
    }

    return(
        <div className="upload-wrapper">
            <form className="upload-form" onSubmit={ handleSubmit }>
                <h1>Upload</h1>
                <ul className="upload-errors-ul">
                    { errors.map( ( error, idx ) => (
                        <li key={ idx } className="error-li">{ error }</li>
                    ))}
                </ul>
                <label>
                    <p>Name</p>
                    <input type="text" onChange={ updateName } value={ name } />
                </label>
                <label>
                    <p>File URL (Path + Filename)</p>
                    <input type="text" onChange={ updateFileURL } value={ fileURL } />
                </label>
                <button className="upload-button" type="submit">Upload</button>
            </form>
        </div>
    )
}