import React from 'react';
import {
    SvgIcon
} from '@material-ui/core';
import PropTypes from 'prop-types';

const PushPin = ({priorityStatus, changePriority, i}) => {
    return (
        <SvgIcon style={{ color: priorityStatus ? 'black' : 'gray' }} onClick={() => changePriority(i)} >
            <path d="M19.083 1c0 1.018-1.424 1.907-3.541 2.382V11c2.926.652 4.958 2.086 4.958 3.751h-7.792V23h-1.416v-8.25H3.5c0-1.665 2.032-3.1 4.958-3.751V3.382C6.341 2.907 4.917 2.018 4.917 1h14.166zs" />
        </SvgIcon>
    )
}

export { PushPin }; 