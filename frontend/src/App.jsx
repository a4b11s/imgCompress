import "./App.css";
import ImgInput from "./Component/ImgInput";
import { useState } from "react";
import Spiner from "./Component/Spiner";

function App() {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadData, setUploadData] = useState("");

	function handleFile(files) {
		setUploadData("");
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append(files[i].name, files[i]);
		}
		setIsUploading(true);
		fetch("http://localhost:3002/api/img", {
			method: "POST",
			body: formData,
		}).then((data) => {
			data.blob().then((blob) => {
				const objectURL = URL.createObjectURL(blob);
				setUploadData(objectURL);
				setIsUploading(false);
			});
		});
	}

	return (
		<div className="container">
			{isUploading ? <Spiner /> : <ImgInput callback={handleFile} />}

			{uploadData && (
				<a className="downloadBtn" href={uploadData}>
					Download
				</a>
			)}
		</div>
	);
}

export default App;
