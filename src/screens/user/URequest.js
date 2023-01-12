import React, {useContext} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AuthContext} from '@contexts';
import {getLastRequestOfUser} from '@apis';

import {Before} from './URequest/Before';
import {After} from './URequest/After';
import {Review} from './URequest/Review';

export const URequest = () => {
  const {auth} = useContext(AuthContext);

  const {data, refetch} = useQuery({
    queryKey: ['URequest'],
    queryFn: () => getLastRequestOfUser(auth.id),
    enabled: !!auth.id,
    refetchInterval: data =>
      (data?.status === 1 || data?.status === 2 || data?.status === 3) && 3000,
  });

  const status = data?.status;

  return (
    <>
      {status !== 1 && status !== 2 && status !== 3 && status !== 4 && (
        <Before data={data} refetch={refetch} />
      )}
      {(status === 1 || status === 2 || status === 3) && (
        <After data={data} refetch={refetch} />
      )}
      {status === 4 && <Review data={data} refetch={refetch} />}
    </>
  );
};
