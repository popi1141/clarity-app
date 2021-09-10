import React, {useState, useEffect} from "react";
import JobListView from "./JobListView";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

const JobFilter = ({
    jobs, 
    handlePriorityChangeToHigh,
    handlePriorityChangeToReg,
    regPriorityJobs,
    highPriorityJobs,
    initialEditability,
    setInitialEditability,
    updatePriorityLists,
    sethighPriorityJobs,
    setregPriorityJobs,
    ref,
    getUserData,
    handleSaveChanged
    }) => {
    let {path, url} = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <JobListView
                    handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                    handlePriorityChangeToReg={handlePriorityChangeToReg}
                    regPriorityJobs={regPriorityJobs}
                    highPriorityJobs={highPriorityJobs}
                    initialEditability={initialEditability}
                    setInitialEditability={setInitialEditability}
                    updatePriorityLists={updatePriorityLists}
                    sethighPriorityJobs={sethighPriorityJobs}
                    setregPriorityJobs={setregPriorityJobs}
                    ref={ref}
                    getUserData={getUserData}
                    handleSaveChanged={handleSaveChanged}
                    />
                </Route>
                <Route path={`${path}/:tag`}>
                    <JobListView
                    handlePriorityChangeToHigh={handlePriorityChangeToHigh}
                    handlePriorityChangeToReg={handlePriorityChangeToReg}
                    regPriorityJobs={regPriorityJobs}
                    highPriorityJobs={highPriorityJobs}
                    initialEditability={initialEditability}
                    setInitialEditability={setInitialEditability}
                    updatePriorityLists={updatePriorityLists}
                    sethighPriorityJobs={sethighPriorityJobs}
                    setregPriorityJobs={setregPriorityJobs}
                    ref={ref}
                    getUserData={getUserData}
                    handleSaveChanged={handleSaveChanged}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default JobFilter;