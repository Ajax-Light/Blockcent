import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

const orders = [
  {
    id: uuid(),
    ref: 'RF1049',
    amount: 30.5,
    item: {
      name: 'Eggs(dozen)'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'RF1048',
    amount: 25.1,
    item: {
      name: 'Crucial RAM stick'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'RF1047',
    amount: 10.99,
    item: {
      name: 'Movie Ticket'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'RF1046',
    amount: 96.43,
    item: {
      name: 'Pogo stick'
    },
    createdAt: 1554757200000,
    status: 'pending'
  }
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Orders" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                TXN Hash
              </TableCell>
              <TableCell>
                From
              </TableCell>
              <TableCell>
                To
              </TableCell>
              <TableCell>
                Points
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Timestamp
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.histData.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.id.substring(0,10)}
                </TableCell>
                <TableCell>
                  {order.from}
                </TableCell>
                <TableCell>
                  {order.to}
                </TableCell>
                <TableCell>
                  {order.points}
                </TableCell>
                <TableCell>
                  {Date.parse(order.timestamp)}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={'success'}
                  >
                    Committed
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
