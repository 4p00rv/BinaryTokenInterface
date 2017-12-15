const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'scroll',
    background: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[4],
    padding: 10,
    width: '90%',
    minHeight: '85%',
    margin: '0 auto 56 auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%',
  },
  select: {
    display: 'block',
  },
  inputSelect: {
    margin: '17 0 0 8',
    width: '95%',
  },
  buttonProgress: {
    color: theme.palette.secondary[500],
    position: 'absolute',
    marginTop: 22,
    marginLeft: -70,
  },
});

export default styles;
