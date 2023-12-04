import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
    //   selectStudenLoading,
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export default function ListPage() {
    const match = useRouteMatch()
    const studentList = useAppSelector(selectStudentList)
    const pagination = useAppSelector(selectStudentPagination)
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading)
    const cityMap = useAppSelector(selectCityMap)
    const cityList = useAppSelector(selectCityList)
    const history = useHistory()
    const dispatch = useAppDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(
            studentActions.fetchStudentList(filter)
        )
    }, [dispatch, filter]);

    const handlePageChange = (e: any, page: number) => {
        dispatch(
            studentActions.setFilter({
                ...filter,
                _page: page,
            })
        );
    };
    const handleSearchChange = (newFilter: ListParams) => {
        console.log('search change', newFilter)
        dispatch(studentActions.setFilterWithDebounce(newFilter))
    }
    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter))
    }
    const handleRemoveStudent = async (student: Student) => {
        try {
            //remove student api
            await studentApi.remove(student?.id || '')
            toast.success('Remove student successfully!');
            //
            const newFilter = { ...filter }
            dispatch(studentActions.setFilter(newFilter))
        } catch (error) {
            console.log('fail to remove student', error)
        }
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }
    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>

                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add new student
                    </Button>
                </Link>
            </Box>


            {/* Filter */}
            <Box mb={3} >
                <StudentFilters filter={filter} cityList={cityList}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange} />
            </Box>

            {/* Student Table */}
            <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} onEdit={handleEditStudent} />
            {/* Pagination */}
            <Box my={2} display="flex" justifyContent="center">
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination._totalRows / pagination._limit)}
                    page={pagination?._page}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>





    )
}