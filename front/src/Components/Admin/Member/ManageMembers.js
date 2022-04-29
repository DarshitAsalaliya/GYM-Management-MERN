import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddMember from './AddMember';
import MemberList from './MemberList';
import SnackbarMsg from './SnackbarMsg';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Action
import { registerMember, getMemberList } from '../../../Redux/actions/memberAction';

export default function ManageMembers() {

    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.member);
    const { deleteloading, deleteerror, deletesuccess } = useSelector(state => state.deletemember);

    return (
        <>
            {success && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Added Successfully.." severity="success" />}
            {deletesuccess && <SnackbarMsg open="true" vertical="bottom" horizontal="right" message="Deleted Successfully.." severity="error" />}

            <AddMember />
            <MemberList />
        </>
    );
}
