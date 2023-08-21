import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({marketplaceProjects, updateDisplayProjects }):JSX.Element => {
  //passing down all marketplaceProjects
  const [searchText, setSearchText] = useState('');


  const handleChange = (e) => {
    const newText = e.target.value
    setSearchText(newText)
    
  }

  
  useEffect(()=>{
           
    if(searchText === ''){

      updateDisplayProjects(marketplaceProjects)

    }else{

      const patternString = '(?:^|[^a-zA-Z])' + searchText.toLowerCase() + '(?:$|[^a-zA-Z])';
      //(?: [non-capturing group] means to ignore the items inside the parens in terms of looking for that string order in the target 
      //^ refers to the literal beginning of a start of a line or string
      //| pipe operator is an OR statement
      //[^a-zA-Z] [] is grouping characters, the ^ at the beginning means to look for things that are not letters (lowercase or uppercase)
      //a-zA-Z letters (lowercase and uppercase) and underscore symbol
      //All together: match either the start/end of a line/string or any character that is not a letter.
      //Looks for anything that has the searchText in between non-letter characters
      const searchResults = marketplaceProjects.reduce((results, curr) => {
        if(curr.name.match(patternString) || curr.username.match(patternString))
          results.push(curr)
        return results;
      }, [])
      updateDisplayProjects(searchResults)
    }

 }, [searchText])


  return (

    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      style={{ maxWidth: 450, height: '10px' }}
      value= {searchText}
      onChange={handleChange}
    />

  );
};

export default SearchBar;
