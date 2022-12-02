import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const products = [
  {
    id: uuid(),
    name: 'Tea/Coffee',
    imageUrl: '/static/images/products/coffee.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Sandwich',
    imageUrl: '/static/images/products/sandwich.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Burger',
    imageUrl: '/static/images/products/burger.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Letter of Recommendation',
    imageUrl: '/static/images/products/lor.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'Internship',
    imageUrl: '/static/images/products/internship.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Latest Products"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
