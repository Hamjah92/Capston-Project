import { FC, ReactNode } from 'react';

type Props = {
  when: boolean;
  children: ReactNode;
};

export const RenderIf: FC<Props> = ({ when, children }) => <>{when ? children : null}</>;
