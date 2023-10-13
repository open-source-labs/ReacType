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
      return;
    }
    function searching () {

        //more strict pattern not currently used
        //const patternString = '(?:^|[^a-zA-Z])' + searchText.toLowerCase() + '(?:$|[^a-zA-Z])';
        //(?: [non-capturing group] means to ignore the items inside the parens in terms of looking for that string order in the target 
        //^ refers to the literal beginning of a start of a line or string
        //| pipe operator is an OR statement
        //[^a-zA-Z] [] is grouping characters, the ^ at the beginning means to look for things that are not letters (lowercase or uppercase)
        //a-zA-Z letters (lowercase and uppercase) and underscore symbol
        //All together: match either the start/end of a line/string or any character that is not a letter.
        //Looks for anything that has the searchText in between non-letter characters
        const patternString2 = '(?:^|.)' + searchText.toLowerCase() + '(?:$|.)';
        //Only difference is that (?:^|.) (?:$|.) look for anything that matches the string in between any other characters for the username search
        //test3 and 1test) would both match for string 'test'
  
        const searchResults = marketplaceProjects.reduce((results, curr) => {
          const lowName = curr.name.toLowerCase()
          const lowUsername = curr.username.toLowerCase()
          if(lowName.match(patternString2) || lowUsername.match(patternString2))
            results.push(curr)
          return results;
        }, [])
        updateDisplayProjects(searchResults)
    }

    // simple debounce
    const debounceTimer = setTimeout(() => {
      searching();
    }, 800);
    // clears the timer if searchText is changed before the setTimeout duration is reached
    return () => clearTimeout(debounceTimer);

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
