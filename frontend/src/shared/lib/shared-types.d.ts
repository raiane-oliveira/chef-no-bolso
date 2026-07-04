export type ChildrenProps = {
  children: React.ReactNode;
};

export enum Roles {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  DELIVERY = 'delivery',
  GUEST = 'guest',
}

type Role = keyof typeof Roles
