import { Grid, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
// import data from '../dataset/chronicles_combined_new.json';
import WriteUp from '../components/WriteUp/WriteUp';
import StationSelect from '../components/StationSelect/StationSelect';
import fuzz from 'fuzzball';
import { useLocation } from 'react-router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '90vh',
	},
	paper1: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: '50px',
		marginTop: '10px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	paper2: {
		padding: theme.spacing(4),
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: '50px',
		marginTop: '10px',
		marginBottom: '20px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
	},
	formControl: {
		margin: theme.spacing(5),
		minWidth: 220,
	},
	chartContainer: {
		marginTop: '10px',
		margin: '50px',
		backgroundColor: 'rgba(39, 39, 39, 0.7)',
		borderColor: theme.palette.secondary.main,
		borderWidth: '2px',
		borderStyle: 'solid',
		padding: theme.spacing(4),
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ChroniclesPage() {
	const classes = useStyles();
	const query = useQuery();

	const [data, setData] = useState({});
	const [stations, setStations] = useState([]);
	const [full, setFull] = useState([]);
	const [bio, setBio] = useState([]);
	const [index, setIndex] = useState({ start: 0, end: 0 });
	const [search, setSearch] = useState('');
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [student, setStudent] = useState({ name: '', id: '', writeUp: '' });

	const [fade, setFade] = useState(true);
	const [details, setDetails] = useState({ name: '', id: '' });

	useEffect(() => {
		axios.get('/api/chronicles').then((resp) => {
			setData(resp.data);
		});

		const searchParam = query.get('search');
		if (searchParam) {
			setSearch(searchParam);
			query.delete('search');
		}
	}, []);

	useEffect(() => {
		setFade(false);

		setTimeout(() => {
			if (student.name !== '') {
				const lines = student.writeUp.split('\n');
				setBio(lines);
				setDetails({ name: student.name, id: student.id });
			}
			setFade(true);
		}, 200);
	}, [student]);

	useEffect(() => {
		//console.log(data);
		const newArray = [];
		for (const property in data) {
			newArray.push({
				name: property,
				...data[property],
			});
		}

		if (newArray.length > 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: 15 });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
		setFull(newArray);
	}, [data]);

	useEffect(() => {
		let newStations;
		if (search !== '') {
			newStations = full.filter((each) => {
				return (
					fuzz.partial_ratio(
						each.name
							.toLowerCase()
							.replace('private', '')
							.replace('pvt', '')
							.replace('limited', '')
							.replace('ltd', ''),
						search
							.toLowerCase()
							.replace('private', '')
							.replace('pvt', '')
							.replace('limited', '')
							.replace('ltd', '')
					) > 90
				);
				//return each.name.toLowerCase().includes(search);
			});
		} else {
			newStations = full.filter((each) => {
				//return fuzz.partial_ratio(each.name.toLowerCase(), search.toLowerCase()) > 95;
				return each.name.toLowerCase().includes(search);
			});
		}

		setStations(newStations);
		if (newStations.length > 15) {
			setIndex({ start: 0, end: 15 });
			setIsNextDisabled(false);
			setIsPrevDisabled(true);
		} else {
			setIndex({ start: 0, end: newStations.length });
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
	}, [search, full]);

	return (
		<div className={classes.root}>
			{window.innerWidth <= '800' ? (
				<Grid
					container
					direction="row"
					spacing={4}
					style={{ padding: '20px' }}
				>
					<Grid item xs={12}>
						{/* <Paper elevation={3} className={classes.paper1}></Paper> */}
						<StationSelect
							stations={stations}
							index={index}
							setIndex={setIndex}
							search={search}
							setSearch={setSearch}
							setIsNextDisabled={setIsNextDisabled}
							setIsPrevDisabled={setIsPrevDisabled}
							setStudent={setStudent}
							isPrevDisabled={isPrevDisabled}
							isNextDisabled={isNextDisabled}
							type="PS2Sem1"
						/>
					</Grid>
					<Grid item xs={12}>
						<WriteUp fade={fade} details={details} bio={bio} />
					</Grid>
				</Grid>
			) : (
				<Grid container direction="row" spacing={0}>
					<Grid item sm={8} xs={12}>
						<WriteUp fade={fade} details={details} bio={bio} />
					</Grid>
					<Grid item sm={4} xs={12}>
						{/* <Paper elevation={3} className={classes.paper1}></Paper> */}
						<StationSelect
							stations={stations}
							index={index}
							setIndex={setIndex}
							search={search}
							setSearch={setSearch}
							setIsNextDisabled={setIsNextDisabled}
							setIsPrevDisabled={setIsPrevDisabled}
							setStudent={setStudent}
							isPrevDisabled={isPrevDisabled}
							isNextDisabled={isNextDisabled}
							type="PS2Sem1"
						/>
					</Grid>
				</Grid>
			)}
		</div>
	);
}

export default ChroniclesPage;
