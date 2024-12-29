'use client'

import * as React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { createOpportunity } from '@/lib/api'

export default function NewOpportunityPage() {
  const router = useRouter()
  const createMutation = useMutation(createOpportunity, {
    onSuccess: () => {
      router.push('/')
    },
  })

  const [formData, setFormData] = React.useState({
    status: 'applied',
    hybridDays: 0,
    stack: [],
    companyName: '',
    companyLocation: '',
    companyFunding: '',
    companyDescription: '',
    companyFounded: '',
    companyEmployeesIsrael: 0,
    companyEmployeesAbroad: 0,
    contactPerson: '',
    referredBy: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        New Opportunity
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="applied">Applied</MenuItem>
                <MenuItem value="interviewing">Interviewing</MenuItem>
                <MenuItem value="offered">Offered</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hybrid Days"
              name="hybridDays"
              type="number"
              value={formData.hybridDays}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Stack"
              name="stack"
              value={formData.stack.join(', ')}
              onChange={(e) => setFormData(prev => ({ ...prev, stack: e.target.value.split(', ') }))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Location"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Funding"
              name="companyFunding"
              value={formData.companyFunding}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Company Description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Founded"
              name="companyFounded"
              type="date"
              value={formData.companyFounded}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Employees in Israel"
              name="companyEmployeesIsrael"
              type="number"
              value={formData.companyEmployeesIsrael}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Employees Abroad"
              name="companyEmployeesAbroad"
              type="number"
              value={formData.companyEmployeesAbroad}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referred By"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Opportunity
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

