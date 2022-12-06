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

export const m = new Map();
m.set('tea', {
  id: uuid(),
  name: 'Tea',
  imageUrl: '/static/images/products/coffee.png',
  updatedAt: subHours(Date.now(), 2)
});
m.set('coffee', {
  id: uuid(),
  name: 'Coffee',
  imageUrl: '/static/images/products/coffee.png',
  updatedAt: subHours(Date.now(), 2)
});
m.set('sandwich', {
  id: uuid(),
  name: 'Sandwich',
  imageUrl: '/static/images/products/sandwich.png',
  updatedAt: subHours(Date.now(), 2)
});
m.set('burger', {
  id: uuid(),
  name: 'Burger',
  imageUrl: '/static/images/products/burger.png',
  updatedAt: subHours(Date.now(), 3)
});
m.set('recommendLetter', {
  id: uuid(),
  name: 'Letter of Recommendation',
  imageUrl: '/static/images/products/lor.png',
  updatedAt: subHours(Date.now(), 5)
});
m.set('internship', {
  id: uuid(),
  name: 'Internship',
  imageUrl: '/static/images/products/internship.png',
  updatedAt: subHours(Date.now(), 9)
});


export const LatestProducts = ({data}, props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${Object.values(data.Owns).length} in total`}
      title="Latest Products"
    />
    <Divider />
    <List>
      {Object.entries(data.Owns).map((product, i) => (
        <>
        {
          m.has(product[0]) && product[1] > 0 &&
        <ListItem
          divider={i < Object.values(data.Owns).length - 1}
          key={i}
        >
          <ListItemAvatar>
            <img
              alt={m.has(product[0]) ? m.get(product[0]).name : ""}
              src={m.has(product[0]) ? m.get(product[0]).imageUrl : ""}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={m.has(product[0]) ? m.get(product[0]).name : ""}
            secondary={`Quantity: ${product[1]}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      }
      </>
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
