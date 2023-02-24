import "./App.css";
import ImgInput from "./Component/ImgInput";
import React, { useState } from "react";
import Spinner from "./Component/Spinner";
import Alert from "./Component/Alert";



function App() {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadData, setUploadData] = useState("");
	const [isError, setIsError] = useState(false);

	function handleError() {
		setIsError(true)
		setIsUploading(false)
		setTimeout(()=>setIsError(false), 8000)
	}


	function handleFile(files) {
		setUploadData("");
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append(files[i].name, files[i]);
		}
		setIsUploading(true);
		fetch(process.env.REACT_APP_BACKEND_HOST+process.env.REACT_APP_BACKEND_IMG_COMPRESS_ENDPOINT, {
			method: "POST",
			body: formData,
		}).then((data) => {
			data.blob().then((blob) => {
				const objectURL = URL.createObjectURL(blob);
				setUploadData(objectURL);
				setIsUploading(false);
			});
		}).catch(err=>{
			console.log(err)
			handleError(err)
		});
	}


	return (
		<div className="container">
			{isUploading ? <Spinner /> : <ImgInput callback={handleFile} />}
			<Alert isOpen={isError} message="Fetching error"/>
			{uploadData && (
				<a className="downloadBtn" href={uploadData}>
					Download
				</a>
			)}
		</div>
	);
}

export default App;
