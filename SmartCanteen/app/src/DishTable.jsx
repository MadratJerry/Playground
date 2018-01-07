import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6
  },
  paper: {
    overflowX: 'scroll',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
    padding: 16,
    color: theme.palette.text.secondary
  }
})

class DishTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columnData: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }

  state = {
    columnData: [],
    data: []
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ columnData: nextProps.columnData, data: nextProps.data })
  }

  render() {
    const { classes } = this.props
    const { columnData, data } = this.state

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columnData.map(n => (
                      <TableCell key={n.id}>{n.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => {
                    return (
                      <TableRow key={n.id}>
                        {columnData.map(c => (
                          <TableCell key={c.id}>{n[c.key]}</TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(DishTable)
