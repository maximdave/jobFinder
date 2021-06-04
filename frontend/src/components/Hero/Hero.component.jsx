import React from 'react'
import heroStyles from './hero.styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';


const Hero = () => {
  const classes = heroStyles();

  const [query, setQuery] = React.useState('');
  const history = useHistory()

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSearch = e => {
    if (query) {
      history.push(`/search/${query}`)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.heading}>Find the most <br /> exciting startup Jobs</h1>
        <form className={classes.form} onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search jobs..."
            name="search" id="search" className={classes.search}
            onChange={handleChange}
            value={query}
          />
            <Button variant="contained" color="secondary" disableElevation className={classes.searchBtn}
              type="submit"
            >
              Search
            </Button>
        </form>
      </div>
    </div>
  )
}

export default Hero
