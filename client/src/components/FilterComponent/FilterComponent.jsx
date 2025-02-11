import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import {
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Slider,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(5),
		marginLeft: '0px',
		marginRight: '0px',
		minWidth: 220,
	},
}));

function FilterComponent({
	setMainSearch,
	setMainChoice,
	setMainSlider,
	mainSearch,
	type,
}) {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [slider, setSlider] = useState([5, 10]);
	const [choice, setChoice] = useState('Overall');

	useEffect(() => {
		setSearch(mainSearch);
	}, [mainSearch]);

	const handleSearch = (newValue = search) => {
		setSearch(newValue);
	};

	const handleSubmit = () => {
		setMainChoice(choice);
		setMainSearch(search);
		setMainSlider(slider);
	};

	useEffect(() => {
		const listener = (event) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				console.log('hi');
				document.getElementById('subBtn').click();
				event.preventDefault();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	return (
		<div>
			<SearchBar
				value={search}
				onChange={(newValue) => handleSearch(newValue)}
				onRequestSearch={handleSearch}
				onCancelSearch={() => handleSearch('')}
			/>

			{type !== 'response' && (
				<>
					{type === 'PS1' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>
								<MenuItem value={'2021'}>2021</MenuItem>
							</Select>
						</FormControl>
					)}
					{type === 'PS2Sem1' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>

								<MenuItem value={'2020'}>2020</MenuItem>
								<MenuItem value={'2019'}>2019</MenuItem>
								<MenuItem value={'2018'}>2018</MenuItem>
								<MenuItem value={'2017'}>2017</MenuItem>
							</Select>
						</FormControl>
					)}
					{type === 'PS2Sem2' && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								Select Year
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={choice}
								label="Select Year"
								onChange={(e) => setChoice(e.target.value)}
							>
								<MenuItem value={'Overall'}>Overall</MenuItem>
								<MenuItem value={'2021'}>2021</MenuItem>
								<MenuItem value={'2020'}>2020</MenuItem>
								<MenuItem value={'2019'}>2019</MenuItem>
							</Select>
						</FormControl>
					)}
				</>
			)}

			<Typography id="range-slider" gutterBottom>
				CGPA range
			</Typography>
			<Slider
				value={slider}
				onChange={(event, newValue) => setSlider(newValue)}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={(value) => `${value} CGPA`}
				min={5}
				max={10}
				step={0.1}
			/>
			<Button
				id="subBtn"
				onClick={handleSubmit}
				variant="outlined"
				color="primary"
			>
				Search
			</Button>
		</div>
	);
}

export default FilterComponent;
