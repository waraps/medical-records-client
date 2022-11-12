import React from 'react';
import { useFetch } from '../../../hooks';
import { IUser } from '../../../interfaces';

const User = (): JSX.Element => {
    const { loading, data } = useFetch<IUser[]>('/users');

    if (loading) {
        return <div>loading ...</div>;
    }

    return <div>{JSON.stringify(data)}</div>;
};

export { User };
