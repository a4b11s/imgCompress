import React from "react";
import styles from "./Spiner.module.css";
function Spiner() {
	return (
		<div className={styles.spinner}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Spiner;
