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
