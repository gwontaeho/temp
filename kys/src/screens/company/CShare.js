import React, {useContext} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AuthContext} from '@contexts';
import {getRequest} from '@apis';

import {After} from './CShare/After';
import {Review} from './CShare/Review';
import {Complete} from './CShare/Complete';

export const CShare = ({route}) => {
  const {params} = route;
  const {auth} = useContext(AuthContext);

  const {data, refetch} = useQuery({
    queryKey: ['CShare'],
    queryFn: () => getRequest(params),
    enabled: !!params,
    refetchInterval: data =>
      (data?.status === 1 || data?.status === 2 || data?.status === 3) && 3000,
  });

  const status = data?.status;

  return (
    <>
      {(status === 1 || status === 2 || status === 3) && (
        <After data={data} refetch={refetch} />
      )}
      {status === 4 && <Review data={data} refetch={refetch} />}
      {(status === 5 || status === 0) && <Complete data={data} />}
    </>
  );
};
