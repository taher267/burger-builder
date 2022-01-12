import React from "react";
import Ingredents from "../Ingredents/Ingredents";
const Burger = props => {
	let mapping = props.ingredents.map(item => {
		let layerArr = [...Array(item.layer).keys()];
		return layerArr.map(_ => {
			return <Ingredents type={item.type} key={Math.random()} />
		})

	}).reduce((arr, element) => {
		return arr.concat(element)
	}, []);
	if (mapping.length === 0) mapping = <h4>Please add some ingredent!</h4>;
	return (<>
		<div>
			<Ingredents type='bread-top' />
			{mapping}
			<Ingredents type='bread-bottom' />
		</div>
	</>)
}
export default Burger;