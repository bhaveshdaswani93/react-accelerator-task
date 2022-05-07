import React, { Component } from 'react';
import { getCourses } from '../services/fakeCourseService';
import Pagination from './Pagination';

class Courses extends Component {

    constructor(){
        super();
       // console.log('constructor')
        this.state = {
            courses:         [],
            currentPage:     1,
            currentPageData: [],
            pageSize:        2,
        }
    }

    componentDidMount(){
       // console.log('componentDidMount()')
        const { currentPage, pageSize } = this.state;
        const courses = getCourses();
        
        const currentPageData = this.getCurrentPageData(courses, currentPage, pageSize);
        this.setState({  courses, currentPageData  });
    }

    getCurrentPageData(courses, currentPage, pageSize) {
        const start = (currentPage - 1) * pageSize;
        const end = (currentPage) * pageSize;
        const currentPageData = courses.slice(start, end);
        return currentPageData;
    }

    handleRemove = (courseId) => {
        console.log('removing a course', courseId);
        const courses = this.state.courses.filter(c => c._id !== courseId)
        this.setState({courses})
    }

    handlePagination = (pageNumber) => {
        const { courses, pageSize } = this.state;
        const currentPageData = this.getCurrentPageData(courses, pageNumber, pageSize);
        this.setState({ currentPage: pageNumber, currentPageData });
    }

    render() {
        //console.log('render()')

        const { courses, pageSize, currentPageData, currentPage } = this.state;
        const { length: count } = courses;

        if(count===0)
            return <p>No Courses yet!..</p>

        return (
            <div>
                <h1>Courses</h1>
                <hr />

                <p>Showing { count } Courses from the database </p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPageData.map( course => (
                                   <tr key={course._id}>
                                       <td>{course.title}</td>
                                       <td>{course.category.name}</td>
                                       <td>{course.description}</td>
                                       <td>{course.startDate}</td>
                                       <td>{course.endDate}</td>
                                       <td>
                                           <button onClick={ ()=> this.handleRemove(course._id) } className="btn btn-danger btn-sm">
                                               Remove
                                           </button>
                                       </td>
                                   </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

                <Pagination
                    itemsCount={count}
                    pageSize={pageSize} 
                    onPageChange={this.handlePagination}
                    currentPage={currentPage}
                />

            </div>
        );
    }
}

export default Courses;