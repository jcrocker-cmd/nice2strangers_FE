import CustomTable from '../custom-table/CustomTable';

const data = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    phone: '555-1234',
    salary: 50000,
    createdDate: '2023-01-01',
    departmentId: 1,
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    phone: '555-5678',
    salary: 55000,
    createdDate: '2023-02-01',
    departmentId: 2,
  },

    {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    phone: '555-5678',
    salary: 55000,
    createdDate: '2023-02-01',
    departmentId: 2,
  },
    {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    phone: '555-5678',
    salary: 55000,
    createdDate: '2023-02-01',
    departmentId: 2,
  },
    {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    phone: '555-5678',
    salary: 55000,
    createdDate: '2023-02-01',
    departmentId: 2,
  },
  // More data...
];

const columns = [
  { field: 'id', label: 'ID' },
  { field: 'name', label: 'Name' },
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Phone' },
  { field: 'salary', label: 'Salary' },
  { field: 'createdDate', label: 'Created Date' },
  { field: 'departmentId', label: 'Department ID' },
];

export default function App() {
  return (
    <div className="p-6">
      <CustomTable
        data={data}
        columns={columns}
        title="Employee Table"
        pageSizeOptions={[2, 5, 10]}
      />
    </div>
  );
}
