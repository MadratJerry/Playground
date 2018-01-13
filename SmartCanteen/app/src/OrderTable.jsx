import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import Chip from 'material-ui/Chip'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Tooltip from 'material-ui/Tooltip'

class EnhancedTableHead extends React.Component {
  static propTypes = {
    columnData: PropTypes.array.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    checkbox: PropTypes.any
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      columnData,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      checkbox
    } = this.props

    return (
      <TableHead>
        <TableRow>
          {checkbox ? (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          ) : null}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6
  },
  chip: {
    margin: theme.spacing.unit
  },
  paper: {
    overflowX: 'scroll',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
    padding: 16,
    color: theme.palette.text.secondary
  }
})

class OrderTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columnData: PropTypes.array,
    dish: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }

  state = {
    dialogOpen: false,
    dialogDish: { id: 0, dishes: [], price: 0, time: 0 },
    columnData: [
      {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: '订单编号'
      },
      { id: 'table', numeric: true, disablePadding: false, label: '订餐桌号' },
      { id: 'price', numeric: true, disablePadding: false, label: '总金额' },
      { id: 'time', numeric: true, disablePadding: false, label: '时间' }
    ],
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 5
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.state.data.length) {
      this.setState({ data: nextProps.data }, () => {
        this.handleRequestSort(null, 'id', 'desc')
      })
    }
  }

  handleRequestSort = (event, property, o) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc')
      order = 'asc'

    order = o || order

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  handleClick = (event, e) => {
    this.setState({ dialogOpen: true, dialogDish: e })
  }

  handleRequestClose = () => {
    this.setState({ dialogOpen: false })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes, dish } = this.props
    const {
      dialogDish,
      columnData,
      data,
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state

    return (
      <div className={classes.root}>
        {this.state.dialogOpen ? (
          <Dialog
            open={this.state.dialogOpen}
            transition={<Slide direction="up" />}
            keepMounted
            onRequestClose={this.handleRequestClose}
          >
            <DialogTitle>{`#${dialogDish.id}`}</DialogTitle>
            <DialogContent>
              <h2>{`${dialogDish.table}号桌`}</h2>
              {dialogDish.dishes.map(n => (
                <Chip
                  key={n.id}
                  label={`${(dish[n.id - 1] || { name: '未知菜品' })
                    .name} X ${n.num}`}
                  className={classes.chip}
                />
              ))}
              <h3>{`￥${(dialogDish.price || 0).toFixed(2)}`}</h3>
              <DialogContentText>
                {new Date(dialogDish.time).toLocaleString()}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        ) : null}
        <Grid container justify="center" spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Table>
                <EnhancedTableHead
                  columnData={columnData}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, n)}
                          tabIndex={-1}
                          key={n.id}
                        >
                          <TableCell numeric>{n.id}</TableCell>
                          <TableCell>
                            <Chip label={n.table} />
                          </TableCell>
                          <TableCell numeric>
                            {(n.price || 0).toFixed(2)}
                          </TableCell>
                          <TableCell numeric>
                            {new Date(n.time).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(OrderTable)
