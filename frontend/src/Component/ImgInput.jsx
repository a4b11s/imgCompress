import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ImgInput.module.css";

ImgInput.propTypes = {
	callback: PropTypes.func,
};

function ImgInput({ callback }) {
	const input = useRef();
	const [isDragging, setIsDragging] = useState(false);

	function handleInputChange(e) {
		e.preventDefault();
		handleFile(input.current.files);
	}
	function handleFile(files) {
		if (files.length) {
			callback(files);
		}
	}
	function handleDrag(e) {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}

	function handleDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		handleFile(e.dataTransfer.files);
	}

	return (
		<>
			<div onDragEnter={handleDrag} className={styles.wrapper + " " + (isDragging ? styles.wrapper_dragging : "")}>
				Drag and drop your file here or
				<label className={styles.fileInputLabel} htmlFor="input-file-upload">
					Upload a file
				</label>
				<input
					ref={input}
					id="input-file-upload"
					onChange={handleInputChange}
					className={styles.fileInput}
					type="file"
					multiple
					accept="image/*"
				/>
			</div>
			{isDragging && (
				<div
					className={styles.dragDiv}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}></div>
			)}
		</>
	);
}

export default ImgInput;
