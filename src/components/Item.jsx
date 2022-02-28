import classes from './Item.module.css';

const Item = (props) => {
  return (
    <div
      className={classes.item}
      onClick={props.onClickItem}
    >
      {props.value}
    </div>
  );
};

export default Item;
